import Map from "@/components/Map";
import { getPlaces, getProjects } from "@/lib/actions/map.actions";
import { Landmark } from "@/types/map.types";


const Home = async () => {


  const projects = await getProjects();
  const places = await getPlaces();


  console.log("projectssss", projects);
  



  // const projects: Project[] = [
  //   {
  //     name: "سراة من فيول", id: "255545", position: [
  //       [21.713749258798922, 39.12805840919132],
  //       [21.70654215541264, 39.13234536865425],
  //       [21.70312813836255, 39.12499629528922],
  //       [21.698386313695085, 39.12458801343561],
  //       [21.697248252537044, 39.12009691304587],
  //       [21.709197446022582, 39.115197530802526],
  //       [21.71507684373483, 39.118259644704615],
  //       [21.716783720651417, 39.12581285899645],
  //       [21.713749258798922, 39.12805840919132],
  //     ]
  //   },
  // ];

  const basicLandmarks: Landmark[] = [
    { name: "مطار الملك عبدالعزيز الدولي", type: 'airport', position: [21.681865, 39.166439] },
    { name: "مسجد الرحمة ", type: 'mosque', position: [21.597301, 39.133099] },
    { name: "المول السعودي الألماني جدة", type: 'park', position: [21.5452, 39.1331] },
    { name: "الجامعة السعودي الألماني جدة", type: 'educate', position: [21.6, 39.2] },
    { name: "المنتزه السعودي الألماني جدة", type: 'mall', position: [21.577301, 39.25] },
    { name: "المنتزه السعودي الألماني جدة", type: 'sport', position: [21.571101, 39.19] },
  ]

  const landmarks: Landmark[] = [
    { name: "مركز بحور التعليمي", type: 'educate', position: [21.68185, 39.166420] },
    { name: "مركز بحور الصحي", type: 'health', position: [21.59732, 39.1331] },
    { name: "مول العرب", type: 'mall', position: [21.5457, 39.1335] },
    { name: "مول الهلال", type: 'mall', position: [21.65, 39.28] },
    { name: "مركز البلال الصحي", type: 'health', position: [21.577315, 39.2512] },
    { name: "مركز جدة التعليمي", type: 'educate', position: [21.571108, 39.1925] },
    { name: "مركز بحور التعليمي", type: 'educate', position: [21.68285, 39.162420] },
    { name: "مركز بحور الصحي", type: 'health', position: [21.52732, 39.1231] },
    { name: "مول العرب", type: 'mall', position: [21.5757, 39.1535] },
    { name: "مول الهلال", type: 'mall', position: [21.655, 39.25] },
    { name: "مركز البلال الصحي", type: 'health', position: [21.579315, 39.2592] },
    { name: "مركز جدة التعليمي", type: 'educate', position: [21.571128, 39.2925] },
  ];

  return (
    <div>
      <Map projects={projects} basicLandmarks={places} landmarks={landmarks} />
    </div>
  );
};

export default Home;
