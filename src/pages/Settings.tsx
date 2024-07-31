// pages/Settings.jsx
import  { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button, Switch } from '@nextui-org/react';

const Settings = () => {
  const [masjidName, setMasjidName] = useState("Al-Falah Masjid");
  const [address, setAddress] = useState("123 Islamic Way, Muslim City, 12345");
  const [phoneNumber, setPhoneNumber] = useState("+1 (234) 567-8900");
  const [email, setEmail] = useState("info@alfalahmasjid.com");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Settings saved:", { masjidName, address, phoneNumber, email, enableNotifications, darkMode });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <h4 className="text-lg font-semibold">Settings</h4>
      </CardHeader>
      <Divider />
      <CardBody>
        <form className="flex flex-col gap-4">
          <Input 
            label="Masjid Name" 
            value={masjidName} 
            onChange={(e) => setMasjidName(e.target.value)}
          />
          <Input 
            label="Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input 
            label="Phone Number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input 
            type="email" 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <Switch 
              checked={enableNotifications}
              onChange={(e) => setEnableNotifications(e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch 
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </div>
        </form>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-end w-full">
          <Button color="primary" onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Settings;