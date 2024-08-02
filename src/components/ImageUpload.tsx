import React, { useEffect, useRef, useState } from 'react';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import Webcam from '@uppy/webcam';
import ImageEditor from '@uppy/image-editor';
import XHRUpload from '@uppy/xhr-upload';
import { Button } from '@nextui-org/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: Error) => void;
  type: 'donation' | 'expense';
//   resetTrigger: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uppyRef = useRef<any>(null);

  useEffect(() => {
    if (!uppyRef.current) {
      uppyRef.current = new Uppy({
        meta: { type },
        restrictions: {
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*'],
        },
        autoProceed: false,
      })
      .use(Webcam)
      .use(ImageEditor, {
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: true,
          cropWidescreenVertical: true,
        },
      })
      .use(XHRUpload, {
        endpoint: 'https://masjid-management-system-levelfeed.replit.app/upload',
        formData: true,
        fieldName: 'file',
      });

      uppyRef.current.on('complete', (result: { successful: string | any[]; }) => {
        if (result.successful && result.successful.length > 0) {
          const uploadedFileUrl = result.successful[0].response?.body?.location;
          if (uploadedFileUrl) {
            onUploadSuccess(uploadedFileUrl);
            setIsModalOpen(false);
          } else {
            onUploadError(new Error('Upload succeeded but no URL was returned'));
          }
        }
      });

      uppyRef.current.on('error', (error: Error) => {
        onUploadError(error);
        setIsModalOpen(false);
      });
    }

    // return () => {
    //   if (uppyRef.current) {
    //     uppyRef.current.close();
    //   }
    // };
  }, [type, onUploadSuccess, onUploadError]);

//   useEffect(() => {
//     if (uppyRef.current) {
//       uppyRef.current.reset();
//       setIsModalOpen(false);
//     }
//   }, [resetTrigger]);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Upload Receipt
      </Button>
      {uppyRef.current && (
        <DashboardModal
          uppy={uppyRef.current}
          closeModalOnClickOutside
          open={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          plugins={['Webcam', 'ImageEditor']}
        />
      )}
    </>
  );
};

export default ImageUpload;