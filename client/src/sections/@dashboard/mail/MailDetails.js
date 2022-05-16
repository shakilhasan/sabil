import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getMail } from '../../../redux/slices/mail';
//
import Markdown from '../../../components/Markdown';
import Scrollbar from '../../../components/Scrollbar';
import MailDetailsToolbar from './MailDetailsToolbar';
import MailDetailsReplyInput from './MailDetailsReplyInput';
import MailDetailsAttachments from './MailDetailsAttachments';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const MarkdownStyle = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function MailDetails() {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.mail.mails.byId[mailId]);
  const isAttached = mail && mail.files.length > 0;

  useEffect(() => {
    dispatch(getMail(mailId));
  }, [dispatch, mailId]);

  if (!mail) {
    return null;
  }

  return (
    <RootStyle>
      <MailDetailsToolbar mail={mail} />

      <Divider />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {mail.subject}
          </Typography>
          <MarkdownStyle>
            <Markdown children={mail.message} />
          </MarkdownStyle>
        </Box>
      </Scrollbar>

      {isAttached && <MailDetailsAttachments mail={mail} />}

      <Divider />

      <MailDetailsReplyInput />
    </RootStyle>
  );
}
