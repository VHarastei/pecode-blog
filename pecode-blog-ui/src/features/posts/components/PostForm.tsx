import { IPostForm } from '@types';

import { Stack, Paper, TextField } from '@mui/material';

type Props = {
  form: IPostForm;
  disabled?: boolean;
  onChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PostForm({ form, disabled, onChangeForm }: Props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack gap={2}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          placeholder="Enter title"
          value={form.title}
          disabled={disabled}
          onChange={onChangeForm}
        />
        <TextField
          fullWidth
          name="author"
          label="Author"
          placeholder="Enter Author"
          value={form.author}
          disabled={disabled}
          onChange={onChangeForm}
        />
        <TextField
          fullWidth
          multiline
          minRows={5}
          maxRows={10}
          name="content"
          label="Content"
          placeholder="Enter content"
          value={form.content}
          disabled={disabled}
          onChange={onChangeForm}
        />
      </Stack>
    </Paper>
  );
}
