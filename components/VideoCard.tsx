import { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import ProfileLink from './ProfileLink';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setMuted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = (): void => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleVideoAudio = (): void => {
    if (isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setMuted(false);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setMuted(true);
      }
    }
  };

  return (
    <section className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <ProfileLink
          userId={post.postedBy._id}
          imgSrc={post.postedBy.image}
          userName={post.postedBy.userName}
        />
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="w-[200px] h-[300px] md:h-[400] lg:w-[700px]
                lg:h-[530px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            />
          </Link>

          {isHovering && (
            <div
              className="absolute bottom-6 cursor-pointer
              flex gap-10 justify-center w-[200px] lg:w-[700px]
              opacity-40 shadow-lg p-3"
            >
              {isPlaying ? (
                <button
                  onClick={onVideoPress}
                  className="buttonControls outline-none"
                >
                  <BsFillPauseFill />
                </button>
              ) : (
                <button
                  onClick={onVideoPress}
                  className="buttonControls outline-none"
                >
                  <BsFillPlayFill />
                </button>
              )}
              {isMuted ? (
                <button onClick={handleVideoAudio} className="buttonControls">
                  <HiVolumeOff />
                </button>
              ) : (
                <button onClick={handleVideoAudio} className="buttonControls">
                  <HiVolumeUp />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
