import { Fragment } from "react";

import { Loader } from "@components/Loader/Loader";
import { BoardsLinks } from "@components/BoardsLinks";

import { getBoardsSections } from "@src/utils";
import { tabs } from "@src/constants";

import {
  Wrapper,
  BoardsWrapper,
  SideBar,
  Subtitle,
  BoardsSections,
} from "./Styled";

export const DashBoard = ({
  isDBLoading,
  sidebarRef,
  onTabClick,
  activeTab,
  generatedId,
  routeToBoard,
}) => (
  <>
    {isDBLoading ? (
      <Loader />
    ) : (
      <Wrapper>
        <SideBar ref={sidebarRef}>
          {tabs.map(({ icon, title }, index) => (
            <p
              data-tab={index}
              key={index}
              onClick={onTabClick}
              className={index === 0 ? "active" : ""}
            >
              <i className={icon} />
              {title}
            </p>
          ))}
        </SideBar>
        <BoardsSections>
          {getBoardsSections(activeTab).map(({ icon, title, type }) => (
            <Fragment key={title}>
              <Subtitle>
                <i className={icon} />
                {title}
              </Subtitle>
              <BoardsWrapper>
                <BoardsLinks
                  isDBLoading={isDBLoading}
                  sectionType={type}
                  generatedId={generatedId}
                  onClick={routeToBoard}
                />
              </BoardsWrapper>
            </Fragment>
          ))}
        </BoardsSections>
      </Wrapper>
    )}
  </>
);
