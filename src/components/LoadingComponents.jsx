
const LoadingComponents = () => {
    return (
        <div className="main h-full p-16">
            <div className="loading-wave flex justify-center items-end">
              <div className="loading-bar bg-[#c1272d] rounded-[5px] "></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px]"></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px]"></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px]"></div>
          </div>
        </div>
    );
};

export default LoadingComponents;