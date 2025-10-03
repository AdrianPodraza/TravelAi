import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <DotLottieReact
          src="https://lottie.host/a451d802-788e-4b34-9afc-d04dfbd7a10f/fBzB02J7Op.lottie"
          loop
          autoplay
        />
        <h3 className="text-xl text-black">Is Loading....</h3>
      </div>
    </div>
  );
}

export default Loader;
