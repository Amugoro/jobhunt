import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { getClientProfile } from '../utils/api';

const ProfileList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [tradespersons, setTradespersons] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [filteredTradespersons, setFilteredTradespersons] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // restructed api call
        const { success, freelancers, tradespersons, message } = await getClientProfile();
        if (success) {
          setFreelancers(freelancers);
          setTradespersons(tradespersons);
          setFilteredFreelancers(freelancers);
          setFilteredTradespersons(tradespersons);
        } else {
          setError(message);
        }
      } catch (err) {
        setError('Failed to load profiles');
        console.error(err);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = (term, category) => {
    setSearchTerm(term);

    if (category === 'freelancer') {
      const filtered = freelancers.filter(profile =>
        profile.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredFreelancers(filtered);
    } else if (category === 'tradeperson') {
      const filtered = tradespersons.filter(profile =>
        profile.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredTradespersons(filtered);
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Freelancers Button */}
      <button
        onClick={() => openModal('freelancer')}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Freelancers
      </button>

      {/* Tradespersons Button */}
      <button
        onClick={() => openModal('tradeperson')}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Tradespersons
      </button>

      {/* Modal for Search/Filter */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="text-red-500 absolute top-2 right-2 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Filter {selectedCategory === 'freelancer' ? 'Freelancers' : 'Tradespersons'}
            </h2>
            <input
              type="text"
              placeholder="Search by skill"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value, selectedCategory)}
              className="border p-2 w-full mb-4"
            />
            {/* temp resolved filter records not properly displayed */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {(selectedCategory === 'freelancer' ? filteredFreelancers : filteredTradespersons).map((profile) => (
                <ProfileCard key={profile._id} profile={profile} userType={selectedCategory} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Freelancers Section */}
      {!isModalOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} userType="freelancer" />
          ))}
        </div>
      )}

      {/* Tradespersons Section */}
      {!isModalOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTradespersons.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} userType="tradeperson" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileList;
