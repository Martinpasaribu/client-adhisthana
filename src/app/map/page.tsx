"use client";

import dynamic from "next/dynamic";

// const Map = dynamic(
//   () => import("@/component/Map").then((component) => component.Map),
//   { ssr: false }
// );

const HomePage = () => {

  <>
    Map 
  </>
  // const locations = [
  //   { id: "550e8400-e29b-41d4-a716-446655440000", lat: 51.5074, lng: -0.1278 },
  //   { id: "550e8400-e29b-41d4-a716-446655440001", lat: 51.4995, lng: -0.1248 },
  //   { id: "550e8400-e29b-41d4-a716-446655440002", lat: 51.508, lng: -0.1281 },
  //   { id: "550e8400-e29b-41d4-a716-446655440003", lat: 51.512, lng: -0.1246 },
  //   { id: "550e8400-e29b-41d4-a716-446655440004", lat: 51.5101, lng: -0.1221 },
  //   { id: "550e8400-e29b-41d4-a716-446655440005", lat: 51.5154, lng: -0.1321 },
  //   { id: "550e8400-e29b-41d4-a716-446655440006", lat: 51.5067, lng: -0.1227 },
  //   { id: "550e8400-e29b-41d4-a716-446655440007", lat: 51.5074, lng: -0.1278 },
  //   { id: "550e8400-e29b-41d4-a716-446655440008", lat: 51.5098, lng: -0.128 },
  //   { id: "550e8400-e29b-41d4-a716-446655440009", lat: 51.5101, lng: -0.1337 },
  //   { id: "550e8400-e29b-41d4-a716-446655440010", lat: 51.502, lng: -0.1346 },
  //   { id: "550e8400-e29b-41d4-a716-446655440011", lat: 51.5025, lng: -0.1527 },
  //   { id: "550e8400-e29b-41d4-a716-446655440012", lat: 51.504, lng: -0.1425 },
  //   { id: "550e8400-e29b-41d4-a716-446655440013", lat: 51.507, lng: -0.133 },
  //   { id: "550e8400-e29b-41d4-a716-446655440014", lat: 51.5136, lng: -0.14 },
  //   { id: "550e8400-e29b-41d4-a716-446655440015", lat: 51.5145, lng: -0.1444 },
  //   { id: "550e8400-e29b-41d4-a716-446655440016", lat: 51.5143, lng: -0.148 },
  //   { id: "550e8400-e29b-41d4-a716-446655440017", lat: 51.5092, lng: -0.1475 },
  //   { id: "550e8400-e29b-41d4-a716-446655440018", lat: 51.5138, lng: -0.0984 },
  //   { id: "550e8400-e29b-41d4-a716-446655440019", lat: 51.5069, lng: -0.1157 },
  //   { id: "550e8400-e29b-41d4-a716-446655440020", lat: 51.5033, lng: -0.1141 },
  //   { id: "550e8400-e29b-41d4-a716-446655440021", lat: 51.5033, lng: -0.1196 },
  //   { id: "550e8400-e29b-41d4-a716-446655440022", lat: 51.5007, lng: -0.1246 },
  //   { id: "550e8400-e29b-41d4-a716-446655440023", lat: 51.4995, lng: -0.1248 },
  //   { id: "550e8400-e29b-41d4-a716-446655440024", lat: 51.5014, lng: -0.1419 },
  //   { id: "550e8400-e29b-41d4-a716-446655440025", lat: 51.4964, lng: -0.1439 },
  //   { id: "550e8400-e29b-41d4-a716-446655440026", lat: 51.4905, lng: -0.1245 },
  //   { id: "550e8400-e29b-41d4-a716-446655440027", lat: 51.4908, lng: -0.1271 },
  //   { id: "550e8400-e29b-41d4-a716-446655440028", lat: 51.511, lng: -0.1162 },
  //   { id: "550e8400-e29b-41d4-a716-446655440029", lat: 51.507, lng: -0.122 },
  //   { id: "550e8400-e29b-41d4-a716-446655440030", lat: 51.5127, lng: -0.1362 },
  //   { id: "550e8400-e29b-41d4-a716-446655440031", lat: 51.5143, lng: -0.1114 },
  //   { id: "550e8400-e29b-41d4-a716-446655440032", lat: 51.5171, lng: -0.1187 },
  //   { id: "550e8400-e29b-41d4-a716-446655440033", lat: 51.5222, lng: -0.1251 },
  //   { id: "550e8400-e29b-41d4-a716-446655440034", lat: 51.5194, lng: -0.127 },
  //   { id: "550e8400-e29b-41d4-a716-446655440035", lat: 51.5235, lng: -0.1276 },
  //   { id: "550e8400-e29b-41d4-a716-446655440036", lat: 51.516, lng: -0.1184 },
  //   { id: "550e8400-e29b-41d4-a716-446655440037", lat: 51.5152, lng: -0.1169 },
  //   { id: "550e8400-e29b-41d4-a716-446655440038", lat: 51.5115, lng: -0.1131 },
  //   { id: "550e8400-e29b-41d4-a716-446655440039", lat: 51.5101, lng: -0.1221 },
  //   { id: "550e8400-e29b-41d4-a716-446655440040", lat: 51.5132, lng: -0.1183 },
  //   { id: "550e8400-e29b-41d4-a716-446655440041", lat: 51.509, lng: -0.1231 },
  //   { id: "550e8400-e29b-41d4-a716-446655440042", lat: 51.5114, lng: -0.1037 },
  //   { id: "550e8400-e29b-41d4-a716-446655440043", lat: 51.52, lng: -0.1058 },
  //   { id: "550e8400-e29b-41d4-a716-446655440044", lat: 51.5047, lng: -0.1381 },
  //   { id: "550e8400-e29b-41d4-a716-446655440045", lat: 51.5135, lng: -0.1586 },
  //   { id: "550e8400-e29b-41d4-a716-446655440046", lat: 51.5206, lng: -0.1354 },
  //   { id: "550e8400-e29b-41d4-a716-446655440047", lat: 51.5183, lng: -0.1329 },
  //   { id: "550e8400-e29b-41d4-a716-446655440048", lat: 51.5135, lng: -0.1407 },
  //   { id: "550e8400-e29b-41d4-a716-446655440049", lat: 51.5098, lng: -0.1467 },
  // ];

  // type MapProps = {
  //   center: { lat: number; lng: number };
  //   locations: { id: string; lat: number; lng: number }[];
  // };
  
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       flexDirection: "column",
  //       height: "100vh",
  //     }}
  //   >
  //     <Map center={{ lng: -0.1278, lat: 51.5074 }} locations={locations} />
  //   </div>
  // );
};

export default HomePage;