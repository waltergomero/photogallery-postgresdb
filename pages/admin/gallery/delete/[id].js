import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { alertService } from "@/services/alert.service";
import { galleryService } from "@/services/gallery.service";
import Delete from "../delete";

export default function DeletePage({ id }) {
  const [imageInfo, setImageInfo] = useState(null);

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    galleryService
      .getImageInfoById(id)
      .then((x) => setImageInfo(x))
      .catch(alertService.error);
  }, []);

  return <>{imageInfo ? <Delete data={imageInfo} /> : <Spinner />}</>;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
DeletePage.auth = true;
DeletePage.layout = "Admin";
