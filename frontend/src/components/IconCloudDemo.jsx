
import React from 'react';
import { IconCloud } from './ui/icon-cloud';
import {
  SiApple,
  SiGoogle,
  SiAmazon,
  SiFacebook,
  SiX,
  SiSpotify,
  SiSlack,
  SiPaypal,
  SiSnapchat,
  SiLinkedin,
  SiInstagram,
  SiAirbnb,
  SiYoutube,
  SiNvidia,
  SiAdobe,
  SiNetflix,
  SiUber,
  SiDropbox,
  SiTwitch,
  SiTesla,
  SiAsana,
  SiSamsung,
  SiVisa,
  SiSony,
  SiPinterest,
  SiShopify,
  SiHuawei,
  SiIntel,
  SiTiktok
} from "react-icons/si";

const IconCloudDemo = () => {
  const iconSize = 96;

  const icons = React.useMemo(() => [
    <SiApple key="apple" color="#000000" size={iconSize} />,
    <SiGoogle key="google" color="#4285F4" size={iconSize} />,
    <SiAmazon key="amazon" color="#FF9900" size={iconSize} />,
    <SiFacebook key="facebook" color="#1877F2" size={iconSize} />,
    <SiX key="x" color="#000000" size={iconSize} />,
    <SiSpotify key="spotify" color="#1DB954" size={iconSize} />,
    <SiSlack key="slack" color="#4A154B" size={iconSize} />,
    <SiPaypal key="paypal" color="#00457C" size={iconSize} />,
    <SiSnapchat key="snapchat" color="#FFFC00" size={iconSize} />,
    <SiLinkedin key="linkedin" color="#0A66C2" size={iconSize} />,
    <SiInstagram key="instagram" color="#E4405F" size={iconSize} />,
    <SiAirbnb key="airbnb" color="#FF5A5F" size={iconSize} />,
    <SiYoutube key="youtube" color="#FF0000" size={iconSize} />,
    <SiNvidia key="nvidia" color="#76B900" size={iconSize} />,
    <SiAdobe key="adobe" color="#FF0000" size={iconSize} />,
    <SiNetflix key="netflix" color="#E50914" size={iconSize} />,
    <SiUber key="uber" color="#000000" size={iconSize} />,
    <SiDropbox key="dropbox" color="#0061FF" size={iconSize} />,
    <SiTwitch key="twitch" color="#9146FF" size={iconSize} />,
    <SiTesla key="tesla" color="#CC0000" size={iconSize} />,
    <SiAsana key="asana" color="#F06A6A" size={iconSize} />,
    <SiSamsung key="samsung" color="#1428A0" size={iconSize} />,
    <SiVisa key="visa" color="#1A1F71" size={iconSize} />,
    <SiSony key="sony" color="#000000" size={iconSize} />,
    <SiPinterest key="pinterest" color="#E60023" size={iconSize} />,
    <SiShopify key="shopify" color="#7AB55C" size={iconSize} />,
    <SiHuawei key="huawei" color="#FF0000" size={iconSize} />,
    <SiIntel key="intel" color="#0071C5" size={iconSize} />,
    <SiTiktok key="tiktok" color="#000000" size={iconSize} />
  ], [iconSize]);

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[600px]">
      <div className="w-[600px] h-[600px]">
        <IconCloud
          icons={icons}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default IconCloudDemo;