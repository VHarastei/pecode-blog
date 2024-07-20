import Link from 'next/link';
import { IPost } from '@types';
import { useState } from 'react';
import Iconify from '@components/iconify';
import { ROUTES } from '@constants/routes';
import { ConfirmDialog } from '@components/custom-dialog';
import CustomPopover, { usePopover } from '@components/custom-popover';

import { Box, Paper, Stack, Button, MenuItem, Typography, IconButton } from '@mui/material';

type Props = {
  post: IPost;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDetailed?: boolean;
};

export function Post({ post, onEdit, onDelete, isDetailed }: Props) {
  const popover = usePopover();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEdit = () => onEdit(post.id);
  const handleDelete = () => {
    onDelete(post.id);
    handleCloseDeleteDialog();
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    popover.onClose();
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  return (
    <>
      <Paper key={post.id} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Link href={`${ROUTES.VIEW_POST}${post.id}`}>
            <Typography variant="h4">{post.title}</Typography>
          </Link>
          <Box>
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography variant="body1">{post.author}</Typography>
          <Typography variant="body1" color="text.disabled">
            - {post.createdAt}
          </Typography>
        </Stack>
        <Stack gap={0.5} sx={{ mt: 2 }}>
          {isDetailed &&
            post.content.split('\n').map((textItem) => (
              <Typography key={textItem} variant="body1">
                {textItem}
              </Typography>
            ))}
        </Stack>
      </Paper>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ minWidth: 160 }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title="Delete post"
        content="Are you sure?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Yes, delete
          </Button>
        }
      />
    </>
  );
}
