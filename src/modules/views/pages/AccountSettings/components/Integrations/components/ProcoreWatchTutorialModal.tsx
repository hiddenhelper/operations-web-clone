import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import NewModal from 'modules/views/shared/Modal/NewModal';
import { buttonsGlobalStyles } from 'assets/styles';
import { videoStyles } from '../styles';

interface IWatchTutorial {
  show: boolean;
  handleWatchTutorial: (isOpen: boolean) => void;
}

const ProcoreWatchTutorialModal = ({ show, handleWatchTutorial }: IWatchTutorial) => {
  const buttonsClasses = buttonsGlobalStyles();
  const classes = videoStyles();

  return (
    <NewModal show={show} title={'Integrate with Procore'}>
      <DialogContent>
        <div className={`${classes.landscapeMessage}`}>Watch the Tutorial Video in Landscape mode</div>
        <div className={`${classes.containerVideo}`}>
          <ReactPlayer url={`${process.env.REACT_APP_PROCORE_VIDEO_URL}`} controls={true} width="100%" height="100%" />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          data-testid="close-watch-tutorial"
          className={`${buttonsClasses.regular} ${classes.centerButton}`}
          onClick={() => {
            handleWatchTutorial(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </NewModal>
  );
};

export default memo(ProcoreWatchTutorialModal);
