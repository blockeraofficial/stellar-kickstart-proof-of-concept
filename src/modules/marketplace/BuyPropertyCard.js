import { useState } from "react";
import { DollarStatusIcon } from "assets/svgs";
import { EstablishTrustline, BuyRealtyToken } from "modules/marketplace"

const BuyPropertyCard = ({
  isLoading,
  loadingType,
  publicKey,
  kit
}) => {

  const [propertyToken, setPropertyToken] = useState("");

  const RPC_URL = process.env.REACT_APP_STELLAR_TESTNET_RPC_URL;
  const ASSET_CODE = process.env.REACT_APP_ASSET_CODE;
  const ASSET_ISSUER = process.env.REACT_APP_ASSET_ISSUER;
  const CONTRACT_PUBLIC_KEY = process.env.REACT_APP_STELLAR_ASSET_CONTRACT_MANAGER_PUBLIC_KEY
  const ASSET_CONTRACT_ADDRESS = process.env.REACT_APP_ASSET_CONTRACT_ADDRESS
  


  const EstablishTrustlineHandler = async () => {
    await EstablishTrustline(RPC_URL, ASSET_CODE, ASSET_ISSUER, publicKey, kit);
  }

  const BuyRealtyTokenHandler = async () => {
    await BuyRealtyToken(RPC_URL, CONTRACT_PUBLIC_KEY, ASSET_CONTRACT_ADDRESS, propertyToken, publicKey, kit)
  }
  
  return (
    <div className="border-2 border-rocPurple-800 rounded-2xl">
      <div className="rounded-t-xl w-full h-12 bg-rocPurple-800 flex space-x-2 items-center justify-center">
        <DollarStatusIcon />
        <h6 className="font-bold font-manrope text-2xl text-rocWhite-900">
          Buy Property
        </h6>
      </div>
      <div className="p-4 flex flex-col space-y-6 mb-2">
        <div className="flex justify-center">
          <div className="relative rounded-xl overflow-hidden w-full md:max-w-[880px]">
            <input
              value={propertyToken}
              onChange={(e) => setPropertyToken(e.target.value)}
              type="number"
              className="w-full p-4 rounded-xl border-2 border-rocPurple-300 focus:outline-none focus:border-rocPurple-300 font-manrope text-rocPurple-300"
              placeholder="REALTY TOKEN"
            />
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          {isLoading ? (
            <p className="text-rocPurple-800 font-bold text-xl text-center flex justify-center w-full">
              {loadingType === "approval" ? "Approving ..." : "Minting ..."}
            </p>
          ) : (
            <>
              <button
                className={`font-bold w-full rounded-full py-2 ${
                  publicKey
                    ? "bg-rocBlue-100 text-rocWhite-900 border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
                    : "bg-[#808080] text-rocWhite-900 cursor-not-allowed"
                }`}
                onClick={EstablishTrustlineHandler}
              >
                Build Trustline
              </button>
              <button
                className={`font-bold w-full rounded-full py-2 ${
                  publicKey 
                    ? "bg-rocBlue-100 text-rocWhite-900 border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
                    : "bg-[#808080] text-rocWhite-900 cursor-not-allowed"
                }`}
                onClick={BuyRealtyTokenHandler}
              >
                Buy
              </button>
            </>
          )}
        </div>
        <div className="w-full border-2 border-rocPurple-800 rounded-full relative flex justify-center h-[80px]">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-full flex space-x-2 items-center px-3 py-1 bg-rocWhite-900 text-rocPurple-800">
            <h6 className="text-lg font-bold whitespace-nowrap font-manrope">{`Realty Token Price`}</h6>
          </div>
          {/* 
          <div className="rounded-full bg-rocBlue-100 h-[76px] w-[75px] flex justify-center items-center">
            <img src={Tether} alt="tether" className="h-12" />
          </div>
          */}
          <div className="w-1/2 flex justify-center items-center">
            <h6 className="text-rocBlue-100 font-bold text-xl whitespace-nowrap">{`1,000 Test XLM `}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPropertyCard;
