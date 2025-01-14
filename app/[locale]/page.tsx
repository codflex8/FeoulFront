import Map from "@/components/Map";
import { getPlaces, getProjects } from "@/lib/actions/map.actions";
import { Landmark, Project } from "@/types/map.types";


const Home = async () => {


  const projects: Project[] = await getProjects();
  // const places = await getPlaces();  


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
      <Map projects={projects} basicLandmarks={basicLandmarks} landmarks={landmarks} />
    </div>
  );
};

export default Home;
