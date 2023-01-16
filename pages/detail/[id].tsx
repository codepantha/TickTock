import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';

import { BASE_URL } from '../../utils';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!post) return;

  const onVideoClick = () => {
    if (!playing) {
      videoRef.current?.play()
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }

  const handleVideoAudio = () => {
    if (!isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false)
      }
    }
  }

  return (
    <div
      className="flex w-full absolute left-0 top-0 bg-white
      flex-wrap lg:flex-nowrap"
    >
      <div
        className="relative flex-2 w-[1000px] lg:w-9/12 flex
        justify-center items-center bg-blurred-img bg-no-repeat
        bg-cover bg-center"
      >
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              onClick={() => {}}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            />
          </div>

          <div className="absolute top-[45%] left-[45%]">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10
          right-5 lg:right-10 cursor-pointer"
        >
          {isMuted ? (
              <button onClick={handleVideoAudio} className="buttonControls" >
                <HiVolumeOff />
              </button>
            ) : (
              <button onClick={handleVideoAudio} className="buttonControls">
                <HiVolumeUp />
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

type Props = {
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ params: { id } }: Props) => {
  const { data } = await axios.get(`${BASE_URL}/api/posts/${id}`);

  return {
    props: { postDetails: data }
  };
};

export default Detail;
