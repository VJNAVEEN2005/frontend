import React from "react";
import Project_card from "../components/Project_card";
import "./style.scss";

function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className=" md:max-w-xl  mt-8">
          <h1 className="ml-6 text-teal-500 font-bold text-5xl ">Synclance</h1>
          <div className="mt-9 text-sm md:text-base m-6">
            <p>
              HEllo Every one this a freelancing website Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Omnis velit dignissimos maxime,
              vel veniam laboriosam laudantium natus quibusdam ex deserunt
              maiores eos magnam, totam amet! Ullam sed magni rerum minima quis
              blanditiis quisquam totam, saepe facilis hic sequi, commodi
              incidunt? Magnam labore tenetur soluta voluptate reiciendis sit
              quae quo architecto, dolores vel alias unde inventore nostrum
              dignissimos eaque? Hic saepe quo, qui necessitatibus ratione
              consectetur, quibusdam ut recusandae eveniet nulla iusto sequi
              ipsam velit veritatis aut repellendus earum, itaque distinctio
              rerum? Hic, autem. Velit, in iusto quidem ad eos veniam
              consectetur nam blanditiis exercitationem corporis praesentium
              illo, facere distinctio atque voluptate modi tenetur porro unde
              molestias magnam itaque sed ducimus quibusdam? Vel nam pariatur
              corporis incidunt magnam, debitis modi optio ipsa temporibus
              perferendis ab dolores cumque veritatis totam aspernatur non
              molestias eaque quam. Alias, voluptate, veniam quaerat commodi
              dolorum iste cum debitis recusandae, ullam provident repellendus
              quia minus eveniet temporibus aspernatur iure? Impedit minus ex
              ducimus excepturi corrupti delectus distinctio numquam esse
              maiores aliquid totam officiis necessitatibus eius architecto est
              eos, vitae pariatur. Cumque exercitationem fugit voluptatem veniam
              aspernatur impedit harum. Veritatis, rerum dolores provident vitae
              architecto mollitia quam enim harum hic, labore magnam expedita
              aperiam! Cumque dolores aliquam architecto iusto accusamus quasi,
              rerum vel natus voluptates! Deserunt animi rem aut sapiente veniam

            </p>
          </div>
        </div>
        <div className="project_box m-6" >
          <Project_card />
        </div>
      </div>
    </>
  );
}

export default Home;
