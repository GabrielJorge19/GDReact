import { useContext, createContext, useState } from 'react';
import InfoWindow from './InfoWindow';
import data from '../data';

export const DataApp = createContext();
export const InfoWindowCtx = createContext();

export function useDataApp() { return useContext(DataApp); }
export function useInfoWindow() { return useContext(InfoWindowCtx); }

export function DataAppContext({ children }) {

    return (
        <DataApp.Provider value={data}>
            <InfoWindow>
                {children}
            </InfoWindow>
        </DataApp.Provider>
    );
}








