import { memo, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { Icon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

const SelectedLocation = ({ center }:MapProps) => {
  const map = useMap(); // Panggil useMap di dalam komponen yang dirender dalam MapContainer
  useEffect(() => {
    map.panTo(center, { animate: true });

    return () => {
      map.off(); // Menghapus semua event listeners dari peta saat komponen di-unmount
    };
  }, [map, center]);

  return null;
};

// export const Map: React.FC<MapProps> = memo(({ center, locations }) => {
//   const [mapType, setMapType] = useState<MapType>("roadmap");
//   const [selectedLocation, setSelectedLocation] = useState<MapLocation | undefined>();
//   const [mapInstance, setMapInstance] = useState<any>(null); // Menyimpan instance peta

//   const getUrl = () => {
//     const mapTypeUrls: Record<MapType, string> = {
//       roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
//       satellite: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
//       hybrid: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
//       terrain: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
//     };
//     return mapTypeUrls[mapType];
//   };

//   const mapMarkIcon = new Icon({
//     iconUrl: "map-marker.png",
//     iconSize: [47, 55],
//   });
//   const mapMarkActiveIcon = new Icon({
//     iconUrl: "active-map-marker.png",
//     iconSize: [57, 65],
//   });

//   const renderMarks = () => {
//     return locations.map((location) => (
//       <div key={location.id}>
//         <Marker
//           icon={location.id === selectedLocation?.id ? mapMarkActiveIcon : mapMarkIcon}
//           position={{ lat: location.lat, lng: location.lng }}
//           eventHandlers={{
//             click: () => {
//               setSelectedLocation(location);
//             },
//           }}
//         />
//       </div>
//     ));
//   };

//   // Handle map reloading with map.remove()
//   useEffect(() => {
//     if (mapInstance) {
//       mapInstance.remove(); // Menghapus peta lama jika ada
//     }

//     const map = useMap(); // Mendapatkan instance peta baru
//     setMapInstance(map); // Menyimpan instance peta baru

//     return () => {
//       map.off(); // Menghapus semua event listeners dari peta saat komponen di-unmount
//     };
//   }, [center]); // Akan dijalankan setiap kali 'center' berubah

//   return (
//     <>
//       <div
//         style={{
//           width: "80%",
//           height: "80vh",
//           borderRadius: "20px",
//           overflow: "hidden",
//         }}
//       >
//         <MapContainer
//           center={center}
//           zoom={13}
//           minZoom={5}
//           zoomControl={false}
//           attributionControl={false}
//           style={{ width: "100%", height: "100%" }}
//         >
//           <TileLayer url={getUrl()} />
//           {selectedLocation && <SelectedLocation center={selectedLocation} />}
//           {renderMarks()}
//           <ZoomControl position="topright" />
//         </MapContainer>
//       </div>
//       <div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
//         <button onClick={() => setMapType("roadmap")}>roadmap</button>
//         <button onClick={() => setMapType("satellite")}>satellite</button>
//         <button onClick={() => setMapType("hybrid")}>hybrid</button>
//         <button onClick={() => setMapType("terrain")}>terrain</button>
//       </div>
//     </>
//   );
// });
