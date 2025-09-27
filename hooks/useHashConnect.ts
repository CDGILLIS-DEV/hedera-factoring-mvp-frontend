import { useEffect, useState } from "react";
import { HashConnect, MessageTypes } from "hashconnect";

export function useHashConnect(appName: string) {
    const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
    const [pairingData, setPairingData] = useState<MessageTypes.ApprovePairing | null>(null);

    useEffect(() => {
        const init = async () => {
            const hc = new HashConnect();

            // Generate an app metadata object
            const appMetadata = {
                name: appName,
                description: "Hedera Factorig DApp",
                url: "http://localhost:3000",
                icon: " "      // Add url that points to app logo
            };

            // Init HashConnect
            await hc.init(appMetadata, "testnet");

            // Listen for wallet connection
            hc.pairingEvent.on((data) => {
                console.log("Wallet paired: ", data);
                setPairingData(data);
            });

            // Create pairing string and log it
            const pairingString = await hc.connect();
            console.log("Pairing string:", pairingString);
            
            setHashconnect(hc);
        };

        init();
    }, [appName]);

    return { hashconnect, pairingData };
}
