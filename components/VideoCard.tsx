import { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

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
        setMuted(false)
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setMuted(true)
      }
    }
  };

  return (
    <section className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p
                  className="flex gap-2 items-center md:text-md
                    font-bold text-primary"
                >
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p
                  className="capitalize font-medium text-sm
                text-gray-500 hidden md:block"
                >
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
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
          <Link href="/">
            <video
              ref={videoRef}
              loop
              className="w-[200px] h-[300px] md:h-[400] lg:w-[600px]
                lg:h-[530px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            />
          </Link>

          {isHovering && (
            <div className="absolute bottom-6 cursor-pointer
              flex gap-10 justify-center w-[200px] lg:w-[600px]
              opacity-40 shadow-lg p-3"
            >
              {isPlaying ? (
                <button onClick={onVideoPress} className="buttonControls outline-none">
                  <BsFillPauseFill />
                </button>
              ) : (
                <button onClick={onVideoPress} className="buttonControls outline-none">
                  <BsFillPlayFill />
                </button>
              )}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
