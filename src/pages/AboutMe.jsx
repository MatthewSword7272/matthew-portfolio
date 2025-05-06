import React from "react";
import MainLayout from "../layouts/MainLayout";

const Test = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-20 px-4 pb-10 gap-2">
        <div className="flex justify-center">
          <img className="rounded-full object-cover size-[400px] object-top" src="/images/ME.jpg" alt="Portait" />
        </div>
        <div className="text-gray-100 flex flex-col gap-4">
          <h2 className="text-3xl">Hi, my name is Matthew!</h2>
          <p className="flex flex-col gap-4">
            I’m a quirky and young aspiring Full-Stack Developer with a passion
            for crafting seamless web applications based in Melbourne. My main
            mission in life, is to try my best in any situation. After
            graduating from high school, I wanted to get in to coding. So with
            no doubt in my mind, I went on to complete my Bachelor of Computer
            Science (Professional) at Swinburne University, graduating with
            Distinction.
            <br />
            <br />
            Currently, I’m honing my skills as a Web Developer, where I am
            diving headfirst into the world of software development and soaking
            in new concepts and technologies. I thrive in collaborative
            environments and approach each project with meticulous attention to
            detail.
            <br />
            <br />
            My technical toolkit includes Front-end technologies like HTML,
            React, TypeScript, Vue.js and Tailwind; Back-end frameworks like
            Node.js, PHP and Laravel; and DevOps tools like AWS and Docker.
            <br />
            <br />
            Outside of coding, I’m a passionate enthusiast of both modern and
            retro gaming. Spend my free time playing the best video games have
            to offer and collect retro games. I'm also an Advanced Certified
            PADI Scuba Diver who loves exploring ocean depths and exploring the
            unknown, and a passionate supporter of the Essendon Bombers.
            <br />
            <br />
            I can be pretty adventurous. You can catch me travelling to new
            destinations, drinking a Bourbon and Coke and sharing a good laugh
            with my friends and family.
            <br />
            <br />
            Whether building innovative web solutions or exploring new
            frontiers, I'm always ready for the next challenge. Let's connect
            and create something amazing together.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Test;
