import React, {FunctionComponent, useCallback, useState} from 'react';
import {HomeComponentPropsInterface} from './HomeComponentPropsInterface';
import MapComponent from "../map/component";
import MyDropzone from "../dragndrop/component";
import convertCSVToJSON from "../../utilities/csvToJSONConverter";
import {LogItemInterface} from "../../utilities/logItem";
import OSMComponent from "../open-street-map/component";

const Home: FunctionComponent<HomeComponentPropsInterface> = ({...props}) => {
    const [gpsData, setGpsData] = useState< Array<LogItemInterface> | null>(null);

    const onFileLoaded = useCallback((fileContent) => {
        const fileContentArray = convertCSVToJSON(fileContent);

        setGpsData(fileContentArray);
    }, []);

    const handleReset = useCallback(() => {
        setGpsData(null);
    }, []);

    return (
        <div className="container">
            {gpsData ? (
                <>
                    <button type="submit" className="reset-button" onClick={handleReset}>
                        Reset
                    </button>
                    <MapComponent logInfo={gpsData} />
                </>
            ) : (
                <div className="dropzone-container">
                    <MyDropzone onFileLoaded={onFileLoaded} />
                </div>
            )}
        </div>
    );
};

export default React.memo(Home);
