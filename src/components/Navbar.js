import { useState, useEffect } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  FreighterModule,
} from '@creit.tech/stellar-wallets-kit';
import { NavLink } from "react-router-dom";
import { Excalamation, HandBurger, StellarConnection } from "assets/svgs";
import { rocPurpleLogo } from 'assets/images';

const Navbar = ({toggle}) => {

  const [connectedWalletPublicKey, setConnectedWalletPublicKey] = useState(null);

  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: FREIGHTER_ID,
    modules: [new FreighterModule()],
  });

  const connectWallet = async () => {
    await kit.openModal({
      onWalletSelected: async (option) => {
        kit.setWallet(option.id);
        const { address } = await kit.getAddress();
        setConnectedWalletPublicKey(address);
      }
    });
  };
  
  useEffect(() => {
    const fetchConnectedWallet = async () => {
      try {
        const { address } = await kit.getAddress();
        if (address) {
          setConnectedWalletPublicKey(address);
          
        }
      } catch (error) {
        // Wallet not connected yet
      }
    };

    fetchConnectedWallet();
  }, []);

  const abbreviate = (addr) => `${addr.slice(0, 3)}...${addr.slice(-5)}`;
  

  return (
    <div className="bg-white w-full rounded-full flex items-center justify-between p-2">
      <div className="hidden lg:flex space-x-2 items-center ml-3">
        <Excalamation />
        <h6 className="font-semibold text-rocBlack-100 font-manrope">
          Welcome to the Realty on Chain Stellar Testnet Beta Testing - For demonstration purposes only!
        </h6>
      </div>
      <NavLink to={"/"} className={"block lg:hidden pl-2"}>
        <img src={rocPurpleLogo} alt="website-logo" className="h-11" />
      </NavLink>
      <div className="space-x-2 flex items-center">
        {connectedWalletPublicKey ? (
          <div className="flex items-center space-x-2 bg-rocPurple-300 px-1 lg:px-2 py-1 rounded-full cursor-pointer">
            <p className="bg-white text-black text-[16px] rounded-full px-4 font-manrope">
              {abbreviate(connectedWalletPublicKey)}
            </p>
            <StellarConnection />
          </div>
        ) : (
          <button
            className="bg-rocPurple-300 px-4 lg:px-4 py-1 rounded-full text-rocWhite-900 font-manrope border border-[#1a54da] hover:bg-rocWhite-900 hover:text-rocBlack-100"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
        <HandBurger
          onClick={toggle}
          className="cursor-pointer block lg:hidden"
        />
      </div>
    </div>
  );
};

export default Navbar;
