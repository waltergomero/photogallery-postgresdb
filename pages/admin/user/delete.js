import React from 'react'
import { useRouter } from 'next/router';
import { userService } from '@/services/user.service'

export default function DeleteUserPage(props) {
    const user = props?.user;
    const title = "Are you sure you want to delete this user?";
    const router = useRouter();

    
  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
   }

   const handleDelete = (id) => {
      userService.delete(id);
      router.push('/admin/user');
   }

  return (
    <>
    <div className="flex h-full flex-col items-center ">
    <div className="columns-sm px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md border border-red-300">
    <h5 className="text-red-500 text-lg leading-tight font-medium ml-6 mt-2">{title}</h5>
       <div className="mt-4 md:mt-0 md:col-span-2">
         <form> 
             <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                     <div className="col-span-6 sm:col-span-3">
                         <label className="block text-sm font-medium text-gray-700">First Name:</label>
                         <h2>{user.first_name}</h2>                        
                     </div>                     
                     <div className="col-span-6 sm:col-span-3">
                         <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                         <h2>{user.last_name}</h2>                        
                     </div>
                   </div>
                   <div className="mt-4">                       
                         <label className="block text-sm font-medium text-gray-700">Email:</label>
                         <h2>{user.email}</h2>
                                            
                   </div>
             </div>
             <div className="text-right">
             <button onClick={handleCancel} className="px-6 py-1 mt-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600">Cancel</button>
                 <span>&nbsp; </span>
                 <button onClick={() => handleDelete(user.user_id)} className="px-6 py-1 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
             </div>
         
         </form>
       </div>
     </div>
     </div>
       </>     
  )
}
DeleteUserPage.layout = "Admin";