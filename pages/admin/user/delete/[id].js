import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Spinner';
import { alertService } from '@/services/alert.service';
import { userService } from '@/services/user.service';
import DeleteUserPage from '../delete';

export default function Delete({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)
    }, []);

    return (
        <>
          {user ? <DeleteUserPage user={user} /> : <Spinner /> }
        </>
                
    );
}

export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}

Delete.layout = "Admin";