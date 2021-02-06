import { useGetBoardsLinks } from "@hooks/useGetBoardLinks";
import { BoardLink } from "@components/BoardLink/BoardLink";
import { Wrapper } from "@components/BoardLink/Styled";

export const BoardsLinks = ({
  isDBLoading,
  sectionType,
  generatedId,
  onClick,
}) => {
  const [getLinks] = useGetBoardsLinks(isDBLoading, sectionType);
  return (
    <>
      {getLinks().length ? (
        getLinks().map(({ to, type, title, board }, index) => (
          <BoardLink
            key={index}
            to={to}
            title={title}
            boardId={board}
            type={type}
            id={generatedId}
            onClick={() => onClick(type)}
          />
        ))
      ) : (
        <Wrapper>
          <p
            style={{
              backgroundColor: "#dcedff",
              color: "var(--main-light-background)",
              fontWeight: 400,
            }}
          >
            No Boards Yet
          </p>
        </Wrapper>
      )}
    </>
  );
};
