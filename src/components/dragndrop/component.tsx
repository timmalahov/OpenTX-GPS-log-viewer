import React, { FunctionComponent, useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { DndComponentProprsInterface } from './DndComponentProprsInterface';

const MyDropzone: FunctionComponent<DndComponentProprsInterface> = ({
  onFileLoaded,
}: DndComponentProprsInterface) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: DropzoneOptions['onDrop']) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents

        const binaryStr = reader.result;
        // console.log(binaryStr);
        if (onFileLoaded) {
          onFileLoaded(binaryStr as string);
        }
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...getRootProps()}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div className="dropzone">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Drag'n'drop log file here, or click to select files</p>
      </div>
    </div>
  );
};

export default MyDropzone;
