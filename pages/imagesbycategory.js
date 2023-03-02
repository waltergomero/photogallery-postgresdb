import lgZoom from "lightgallery/plugins/zoom";
import dynamic from "next/dynamic";
import Image from "next/image";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import axios from "axios";
import { frontService } from "@/services/front.service";
import { alertService } from "@/services/alert.service";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { NEXT_API_URL } from "@/config/index";

const baseUrl = `${NEXT_API_URL}/front`;

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

export default function ImagesByCategory(props) {
  const { images } = props;
  //const searchParams = useSearchParams();
  // const category_id = searchParams.get("id");
  //const [images, setImages] = useState(null);

  // useEffect(() => {
  //   if (category_id) {
  //     frontService
  //       .getImagesByCategoryId(category_id)
  //       .then((x) => setImages(x))
  //       .catch(alertService.error);
  //   }
  // }, []);
  console.log("On refresh: ", images);
  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <LightGallery mode="lg-fade" plugins={[lgZoom]}>
            {images &&
              images?.map((item) => (
                //   <Image
                //   key={item.image_id}
                //   alt={item.category_name}
                //   className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                //   src={'/' + item.path_original}
                //   width={720}
                //   height={480}
                //   sizes="(max-width: 640px) 100vw,
                //     (max-width: 1280px) 50vw,
                //     (max-width: 1536px) 33vw,
                //     25vw"
                // />
                <img
                  key={item.image_id}
                  className="rounded-lg mb-2 cursor-pointer"
                  src={"/" + item.path_original}
                  alt={item.image_name}
                />
              ))}
          </LightGallery>
        </div>
      </main>
    </>
  );
}
//import { useRouter } from "next/router";
export async function getServerSideProps(context) {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  // const router = useRouter();
  const { id } = context.query;
  console.log("iddd: ", id);
  const url = `${baseUrl}/${id}`;
  //const url = `${baseUrl}/category`;
  const { data: images } = await axios.get(url);
  console.log("images ", images);
  return {
    props: { images },
  };
}

ImagesByCategory.layout = "Front";
