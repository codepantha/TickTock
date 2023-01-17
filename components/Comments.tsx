import React, { Dispatch, SetStateAction, FormEvent } from 'react';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

interface IProps {
  comments: {
    comment: string;
    _key: string;
    postedBy: { _ref: string };
  }[];
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent<HTMLFormElement>) => void;
  isPostingComment: boolean;
}

const Comments = ({
  comment,
  comments,
  addComment,
  setComment,
  isPostingComment
}: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div
      className="border-t-2 border-gray-200 pt-4 px-10
      bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]"
    >
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>Video comments</div>
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="bg-primary px-6 py-4 text-md font-medium
                border-2 w-[250px] md:w-[700px] lg:w-[350px]
                border-gray-100 focus:outline-none focus:border-2
                focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              type="submit"
              className="text-md text-gray-400"
            >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
