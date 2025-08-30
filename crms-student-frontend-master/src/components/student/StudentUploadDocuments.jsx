import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/slices/pageTitleSlice';
import { uploadFile } from '../../redux/slices/fileSlice';
import Header from '../layout/Header';

const StudentUploadDocuments = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.files);
  
  useEffect(() => {
    dispatch(setPageTitle("Upload Documents"));
  }, [dispatch]);

  const [documents, setDocuments] = useState([
    { documentname: "Aadhaar Card", file: null, date: null },
    { documentname: "PAN Card", file: null, date: null },
    { documentname: "Photo", file: null, date: null },
    { documentname: "Marksheet", file: null, date: null },
  ]);

  const handleFileChange = (index, file) => {
    const updatedDocs = [...documents];
    updatedDocs[index].file = file;
    updatedDocs[index].date = new Date().toLocaleDateString();
    setDocuments(updatedDocs);
  };

  const handleUpload = async (index) => {
    if (!documents[index].file) {
      enqueueSnackbar('Please select a file first', { variant: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append('file', documents[index].file);
    formData.append('id', user?.id || '');
    formData.append('mongoID', user?._id || '');
    formData.append('documentname', documents[index].documentname);

    try {
      const resultAction = await dispatch(uploadFile(formData));
      
      if (uploadFile.fulfilled.match(resultAction)) {
        enqueueSnackbar(`${documents[index].documentname} uploaded successfully!`, { 
          variant: 'success' 
        });
        
        // Clear the file after successful upload if needed
        // const updatedDocs = [...documents];
        // updatedDocs[index].file = null;
        // setDocuments(updatedDocs);
      } else if (uploadFile.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || 'Upload failed');
      }
    } catch (error) {
      enqueueSnackbar(`Failed to upload ${documents[index].documentname}: ${error.message}`, { 
        variant: 'error' 
      });
    }
  };

  return (
    <div>
      <div><Header /></div>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Upload Student Documents
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="border border-blue-300 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-medium text-blue-600 mb-2">
                {doc.documentname}
              </h3>

              {doc.file ? (
                <div className="mb-2">
                  <p className="text-sm text-gray-700">
                    Selected: <span className="font-medium">{doc.date}</span>
                  </p>
                  <div className="mt-2">
                    {doc.file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(doc.file)}
                        alt={doc.documentname}
                        className="w-32 h-32 object-cover rounded-md border border-blue-200"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(doc.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View File
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-2">No file selected yet</p>
              )}

              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border-0
                  file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700
                  hover:file:bg-blue-200 rounded mb-2"
              />
              
              <button
                onClick={() => handleUpload(index)}
                disabled={!doc.file || loading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentUploadDocuments;

// import { useSnackbar } from 'notistack';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle } from '../../redux/slices/pageTitleSlice';
// import Header from '../layout/Header';
// import axios from 'axios';

// const StudentUploadDocuments = () => {
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();
//   const { user } = useSelector((state) => state.auth);
  
//   useEffect(() => {
//     dispatch(setPageTitle("Upload Documents"));
//   }, [dispatch]);

//   const [documents, setDocuments] = useState([
//     { documentname: "Aadhaar Card", file: null, date: null, isUploading: false },
//     { documentname: "PAN Card", file: null, date: null, isUploading: false },
//     { documentname: "Photo", file: null, date: null, isUploading: false },
//     { documentname: "Marksheet", file: null, date: null, isUploading: false },
//   ]);

//   const handleFileChange = (index, file) => {
//     const updatedDocs = [...documents];
//     updatedDocs[index].file = file;
//     updatedDocs[index].date = new Date().toLocaleDateString();
//     setDocuments(updatedDocs);
//   };

//   const handleUpload = async (index) => {
//     if (!documents[index].file) {
//       enqueueSnackbar('Please select a file first', { variant: 'warning' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', documents[index].file);
//     formData.append('id', user?.id || '');
//     formData.append('mongoID', user?._id || '');
//     formData.append('documentname', documents[index].documentname);

//     try {
//       // Update uploading state
//       const updatedDocs = [...documents];
//       updatedDocs[index].isUploading = true;
//       setDocuments(updatedDocs);

//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       enqueueSnackbar(`${documents[index].documentname} uploaded successfully!`, { variant: 'success' });
      
//       // Reset file and uploading state
//       updatedDocs[index].isUploading = false;
//       setDocuments(updatedDocs);
//     } catch (error) {
//       enqueueSnackbar(`Failed to upload ${documents[index].documentname}: ${error.message}`, { variant: 'error' });
      
//       const updatedDocs = [...documents];
//       updatedDocs[index].isUploading = false;
//       setDocuments(updatedDocs);
//     }
//   };

//   return (
//     <div>
//       <div><Header /></div>
//       <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-6">
//           Upload Student Documents
//         </h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {documents.map((doc, index) => (
//             <div
//               key={index}
//               className="border border-blue-300 rounded-lg p-4 shadow-sm"
//             >
//               <h3 className="text-lg font-medium text-blue-600 mb-2">
//                 {doc.documentname}
//               </h3>

//               {doc.file ? (
//                 <div className="mb-2">
//                   <p className="text-sm text-gray-700">
//                     Selected: <span className="font-medium">{doc.date}</span>
//                   </p>
//                   <div className="mt-2">
//                     {doc.file.type.startsWith("image/") ? (
//                       <img
//                         src={URL.createObjectURL(doc.file)}
//                         alt={doc.documentname}
//                         className="w-32 h-32 object-cover rounded-md border border-blue-200"
//                       />
//                     ) : (
//                       <a
//                         href={URL.createObjectURL(doc.file)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View File
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500 mb-2">No file selected yet</p>
//               )}

//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(index, e.target.files[0])}
//                 className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border-0
//                   file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700
//                   hover:file:bg-blue-200 rounded mb-2"
//               />
              
//               <button
//                 onClick={() => handleUpload(index)}
//                 disabled={!doc.file || doc.isUploading}
//                 className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//                   doc.isUploading 
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {doc.isUploading ? 'Uploading...' : 'Upload Document'}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentUploadDocuments;