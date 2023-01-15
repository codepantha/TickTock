import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');
  const [category, setCategory] = useState<string>(topics[0].name);
  const [savingPost, setSavingPost] = useState<boolean>(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  const uploadVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

      setIsLoading(true);

      // if invalid file type
      if (!fileTypes.includes(selectedFile.type)) {
        setIsLoading(false);
        setWrongFileType(true);
        return;
      }

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    }
  };

  const handlePost = async () => {
    if (!caption || !videoAsset?._id || !category) {
      return;
    }

    const document = {
      _type: 'post',
      caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic: category
    }
    
    try {
      await axios.post('http://localhost:3000/api/posts', document);
      router.push('/');
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className="flex w-full h-full absolute left-0 top-[60px]
      mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center"
    >
      <div
        className="bg-white rounded-lg xl:h-[80vh] flex gap-6
          flex-wrap items-center justify-center p-14 pt-6"
      >
        <div>
          <div>
            <p className="text-2xl font-bold">Upload video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>

          <div
            className="border-dashed rounded-xl border-4
            border-gray-200 flex flex-col justify-center
            items-center outline-none mt-10 w-[260px] h-[460px]
            p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"
          >
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="font-semibold text-xl">Upload Video</p>
                        </div>

                        <p
                          className="text-gray-400 mt-10 text-center
                            text-sm leading-10"
                        >
                          MP4 or WebM or Ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>

                        <button
                          type="button"
                          className="bg-[#f51997] text-center mt-10
                          rounded text-white text-md font-medium p-2
                          w-full outline-none"
                        >
                          Select File 
                        </button>
                      </div>

                      <input
                        type="file"
                        name="upload-video"
                        className="w-full pt-2 pb-5"
                        onChange={uploadVideo}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {wrongFileType && (
              <p
                className="text-center text-xl text-red-400 font-semibold
                mt-4 w-[250px]"
              >
                Please select a video file
              </p>
            )}
          </div>
        </div>
        
        {/* Video Caption */}
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            className="rounded outline-noen text-md border-2
              border-gray-200 p-2"
            onChange={(e) => {setCaption(e.target.value)}}
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            className="outline-none border-2 border-gray-200 text-md
            capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => {setCategory(e.target.value)}}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize bg-white p-2 text-md
                  text-gray-700 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              type="button"
              className="border-gray-300 border-2 text-md font-medium
                p-2 rounded w-28 lg:w-44 outline-none"
              onClick={() => {}}
            >
              Discard
            </button>
            <button
              type="button"
              className="bg-[#f51997] text-white text-md font-medium
                p-2 rounded w-28 lg:w-44 outline-none"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
