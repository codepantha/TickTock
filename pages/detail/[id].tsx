import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { GoVerified } from 'react-icons/go';

import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  if (!post) return;

  const onVideoClick = () => {
    if (!playing) {
      videoRef.current?.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const handleVideoAudio = () => {
    if (!isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });

      setPost({ ...post, likes: data.likes })
    }
  };

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
            <MdOutlineCancel
              onClick={() => router.back()}
              className="text-white text-[35px] cursor-pointer"
            />
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              onClick={() => {}}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            />
          </div>

          <div className="absolute top-[45%] left-[45%]">
            {playing ? (
              <button
                onClick={onVideoClick}
                className={`text-white text-6xl lg:text-8xl ${
                  !isHovering && 'hidden'
                }`}
              >
                <BsFillPauseFill />
              </button>
            ) : (
              <button onClick={onVideoClick}>
                <BsFillPlayFill
                  className={`text-white text-6xl lg:text-8xl ${
                    !isHovering && 'hidden'
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-5 lg:bottom-10
          right-5 lg:right-10 cursor-pointer"
        >
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
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
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
                <div className="mt-3 flex flex-col gap-2">
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

          <p className="px-10 text-lg text-gray-600">{post.caption}</p>

          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments />
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
