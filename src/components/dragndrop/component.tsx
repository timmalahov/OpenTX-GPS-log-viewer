import React, { FunctionComponent, useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { DndComponentProprsInterface } from './DndComponentProprsInterface';

const MyDropzone: FunctionComponent<DndComponentProprsInterface> = ({
    onFileLoaded,
    minified = false,
}: DndComponentProprsInterface) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: DropzoneOptions['onDrop']) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {

        const binaryStr = reader.result;
        if (onFileLoaded) {
          onFileLoaded(binaryStr as string);
        }
      };
      // @ts-ignore
      reader.readAsText(file);
    });
  }, []);
  const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
  } = useDropzone({
      onDrop,
      accept: 'text/csv',
      maxFiles: 1,
  });

  // {isDragAccept && (<p>All files will be accepted</p>)}
  // {isDragReject && (<p>Some files will be rejected</p>)}
  // {!isDragActive && (<p>Drop some files here ...</p>)}

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={`dropzone ${isDragAccept ? ' accept' : ''} ${isDragReject ? ' reject' : ''}`}>
        {
          isDragReject
            ? (
                  <p>
                      {
                          minified
                              ? `Not allowed`
                              : `Unexpected file type. Please make sure you're using .csv files`
                      }
                  </p>
              )
            : (
                  <p>
                      {
                          minified
                              ? `Drop new file here`
                              : `Drag'n'drop log file here, or click to select files`
                      }
                  </p>
              )

          // !isDragActive
          // ? (
          //    <p>
          //        {
          //            minified
          //                ? `Drop new file here`
          //                : `Drag'n'drop log file here, or click to select files`
          //        }
          //    </p>
          //   )
          // : ''
        }
      </div>
    </div>
  );
};

export default MyDropzone;
