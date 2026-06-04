var progress = 0;
var speed = 0.1; // makin kecil makin halus
var isRunning = false;
var animationFrame = null;

// interpolasi titik (biar halus)
function interpolate(p1, p2, t) {
    return {
        lat: p1.lat + (p2.lat - p1.lat) * t,
        lng: p1.lng + (p2.lng - p1.lng) * t
    };
}

function animate() {
    if (!isRunning || routeCoords.length < 2) return;

    progress += speed;

    let index = Math.floor(progress);

    // selesai
    if (index >= routeCoords.length - 1) {
        progress = routeCoords.length - 1;
        isRunning = false;
        cancelAnimationFrame(animationFrame);

        // update garis final
        passedLine.setLatLngs(routeCoords);
        remainingLine.setLatLngs([]);

        let jarak = hitungJarakTotal(routeCoords); // km
        let kecepatan = 60;

        let waktuJam = jarak / kecepatan;
        let waktuMenit = waktuJam * 60;

        let menit = Math.floor(waktuMenit);
        let detik = Math.floor((waktuMenit - menit) * 60);

        alert(
            "Simulasi Selesai!\n\n" +
            "Jarak Tempuh: " + jarak.toFixed(2) + " km\n" +
            "Waktu Tempuh:\n" +
            menit + " menit " + detik + " detik\n\n" +
            "(kecepatan 60 km/jam)"
        );

        return;
    }

    // posisi sekarang & berikutnya
    let current = routeCoords[index];
    let next = routeCoords[index + 1];

    let t = progress - index;

    let lat = current.lat + (next.lat - current.lat) * t;
    let lng = current.lng + (next.lng - current.lng) * t;

    // gerakkan mobil
    carMarker.setLatLng([lat, lng]);

    let currentPos = { lat: lat, lng: lng };

    let passedCoords = routeCoords.slice(0, index);
    passedCoords.push(currentPos);

    let remainingCoords = [currentPos, ...routeCoords.slice(index + 1)];

    // update garis
    passedLine.setLatLngs(passedCoords);
    remainingLine.setLatLngs(remainingCoords);

    animationFrame = requestAnimationFrame(animate);
}

function startSim() {
    if (!routeCoords.length || !carMarker) return;
    if (!routeReady) return;
    if (isRunning) return; // Don't start if already running

    // FIX: Only reset if we are at the beginning (progress is 0)
    // If progress > 0, it means we paused and want to resume.
    if (progress === 0) {
        progress = 0;
        carMarker.setLatLng(routeCoords[0]);
        
        // Reset lines
        passedLine.setLatLngs([]);
        remainingLine.setLatLngs(routeCoords);
    }

    isRunning = true;
    animate();
}

function pauseSim() {
    isRunning = false;
    cancelAnimationFrame(animationFrame);
}

//force a reset mid-run
function resetSim() {
    pauseSim();
    progress = 0;
    carMarker.setLatLng(routeCoords[0]);
    passedLine.setLatLngs([]);
    remainingLine.setLatLngs(routeCoords);
}

function hitungJarakTotal(coords) {
    let total = 0;

    function haversine(p1, p2) {
        const R = 6371; // radius bumi (km)
        let dLat = (p2.lat - p1.lat) * Math.PI / 180;
        let dLng = (p2.lng - p1.lng) * Math.PI / 180;

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(p1.lat * Math.PI / 180) *
                Math.cos(p2.lat * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

    for (let i = 0; i < coords.length - 1; i++) {
        total += haversine(coords[i], coords[i+1]);
    }

    return total;
}

function clearMap() {
    pauseSim();
    i = 0;

    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (passedLine) map.removeLayer(passedLine);
    if (remainingLine) map.removeLayer(remainingLine);
    if (carMarker) map.removeLayer(carMarker);
    if (routingControl) map.removeControl(routingControl);

    start = null;
    end = null;
    startMarker = null;
    endMarker = null;
    passedLine = null;
    remainingLine = null;
    carMarker = null;
    routingControl = null;

    routeCoords = [];
    routeReady = false;
}


// =========================
// A* Pathfinding Algorithm
// =========================

class AStarNode {
    constructor(id, lat, lng) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;

        this.g = Infinity;
        this.h = 0;
        this.f = Infinity;

        this.parent = null;
    }
}

function heuristic(nodeA, nodeB) {
    const dx = nodeA.lat - nodeB.lat;
    const dy = nodeA.lng - nodeB.lng;

    return Math.sqrt(dx * dx + dy * dy);
}

function reconstructPath(node) {
    const path = [];

    let current = node;

    while (current) {
        path.unshift({
            lat: current.lat,
            lng: current.lng
        });

        current = current.parent;
    }

    return path;
}

function findPathAStar(graph, startNodeId, goalNodeId) {
    const openSet = [];
    const closedSet = new Set();

    const startNode = graph.nodes[startNodeId];
    const goalNode = graph.nodes[goalNodeId];

    startNode.g = 0;
    startNode.h = heuristic(startNode, goalNode);
    startNode.f = startNode.h;

    openSet.push(startNode);

    while (openSet.length > 0) {

        openSet.sort((a, b) => a.f - b.f);

        const current = openSet.shift();

        if (current.id === goalNode.id) {
            return reconstructPath(current);
        }

        closedSet.add(current.id);

        const neighbors = graph.edges[current.id] || [];

        for (const neighborId of neighbors) {

            if (closedSet.has(neighborId)) {
                continue;
            }

            const neighbor = graph.nodes[neighborId];

            const tentativeG =
                current.g +
                heuristic(current, neighbor);

            if (tentativeG < neighbor.g) {

                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.h = heuristic(neighbor, goalNode);
                neighbor.f = neighbor.g + neighbor.h;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return [];
}

function calculateRouteAStar(start, end) {

    const graph = {
        nodes: {},
        edges: {}
    };

    // Road network preprocessing

    const path = findPathAStar(
        graph,
        "start",
        "goal"
    );

    return path;
}
