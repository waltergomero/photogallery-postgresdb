import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner';
import { alertService } from '@/services/alert.service';
import { userService } from '@/services/user.service';
import AddEdit from '../addedit';

export default function Edit({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)
    }, []);

    return (
        <>
          {user ? <AddEdit user={user} /> : <Spinner /> }
        </>
                
    );
}

export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}

Edit.layout = "Admin";