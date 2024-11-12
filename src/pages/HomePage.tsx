import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { masterData } from '@/utils/masterData';
import { FaCertificate, FaUser, FaChalkboardTeacher, FaFileInvoiceDollar, FaUsers, FaTasks, FaPeopleArrows, FaClipboardList, FaUserTie, FaBullseye } from 'react-icons/fa'; // Importing React Icons

const HomePage = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    scheme: 0,
    target: 0,
    course: 0,
    tp: 0,
    tc: 0,
    batch: 0,
    candidate: 0,
    assessment: 0,
    placement: 0,
    assessor: 0,
    trainer: 0,
    invoice: 0,
  });

  useEffect(() => {
  
    masterData()
      .then((data) => {
        console.log('Fetched data:', data); 
        if (data && data.data && data.data.convergenceCount) {
          const {
            schemesCount,
            coursesCount,
            tpCount,
            tcCount,
            batchCount,
            candidateCount,
            trainerCount,
            assessorCount,
            assessmentCount,
            targetCount,
            invoiceCount,
            placementCount
          } = data.data.convergenceCount;

          setCounts({
            scheme: schemesCount[0]?.count || 0,
            course: coursesCount[0]?.count || 0,
            tp: tpCount[0]?.count || 0,
            tc: tcCount[0]?.count || 0,
            batch: batchCount[0]?.count || 0,
            candidate: candidateCount[0]?.count || 0,
            trainer: trainerCount[0]?.count || 0,  
            assessor: assessorCount[0]?.count || 0, 
            assessment: assessmentCount[0]?.count || 0,
            target: targetCount[0]?.count || 0,
            placement: placementCount[0]?.count || 0,
            invoice: invoiceCount[0]?.count || 0, 
          });
        } else {
          console.error("convergenceCount data is missing or malformed");
        }
      })
      .catch((error) => console.error("Failed to fetch master data:", error));
  }, []);

  // Map each category to its respective icon
  const iconMap : any = {
    scheme: <FaCertificate size={30} />,
    target: <FaBullseye size={30} />,
    course: <FaChalkboardTeacher size={30} />,
    tp: <FaTasks size={30} />,
    tc: <FaUsers size={30} />,
    batch: <FaTasks size={30} />,
    candidate: <FaUser size={30} />,
    assessment: <FaClipboardList size={30} />,
    placement: <FaPeopleArrows size={30} />,
    assessor: <FaUserTie size={30} />,
    trainer: <FaChalkboardTeacher size={30} />,
    invoice: <FaFileInvoiceDollar size={30} />,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {Object.entries(counts).map(([key, count], index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:bg-blue-50 h-48 flex flex-col items-center justify-center"
            onClick={() => navigate(`/${key}`)}
          >
      
            <div className="text-blue-700 mb-4">
              {iconMap[key] } 
            </div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h2>
            <p className="text-gray-800 text-2xl">{count}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
