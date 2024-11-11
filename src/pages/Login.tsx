import React, { useState } from 'react';
import logo from '../../public/assets/ASDM_Logo.png'
import { setCookie } from '@/utils/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('login');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://convergence-upload.skillmissionassam.org/nw/department/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          password: password,
          type: loginType === 'create' ? 'create' : 'login'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      if (data?.data?.token) {
        setCookie('Authorization', data?.data?.token, 7);
      } 
      if (data?.data?.isDept=== 1	){
        navigate('/scheme')
      }
      else {
        throw new Error('Authentication token not received');
      }

    } catch (err) {
      console.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg py-2">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center">

            <img src={ logo } alt="ASDM Logo" className="h-24 w-24 " />
            <div className="border-l-2 border-gray-300 pl-4">
              <h1 className="text-xl font-semibold text-blue-700">
                ASSAM SKILL DEVELOPMENT MISSION
              </h1>
              <h2 className="text-md font-medium text-gray-500">
                GOVERNMENT OF ASSAM
              </h2>
            </div>
          </div>
        </div>
      </nav>


      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
        <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-xl">
          <div className='p-2'>
            <h2 className="text-3xl font-bold text-start text-blue-600">CONVERGENCE</h2>
            <h2 className=" text-lg font-semibold text-start text-gray-700 mt-2">Sign In With Your Admin Account</h2>
          </div>

          <form className="space-y-6" onSubmit={ handleSubmit }>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Login Type</label>
              <select
                value={ loginType }
                onChange={ (e) => setLoginType(e.target.value) }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="login">Department Login</option>
                <option value="create">Login Creation</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                className="w-full px-4 py-3 border  border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={ loading }
              className="w-full px-4 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              { loading ? 'Please wait...' : (loginType === 'create' ? 'Create Account' : 'Sign In') }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
