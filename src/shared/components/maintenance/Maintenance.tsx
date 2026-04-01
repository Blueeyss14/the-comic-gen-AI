import { Asset } from "../../../res/assets";

const Maintenance = () => {
  return (
    <div className="text-[0.85rem] w-100 box-border m-5 bg-grayy/60 border border-whitee/20 gap-5 backdrop-blur-[3px] p-5 rounded-[10px] mb-2 overflow-clip text-justify flex items-center">
      <img src={Asset.MaintenanceIcon} className="w-6 h-6 white-icon-filter" />
      <h2 className="text-whitee">
        This website is currently under maintenance. Please come back later.
      </h2>
    </div>
  );
};

export default Maintenance;
