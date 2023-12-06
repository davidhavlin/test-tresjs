# Preview:

https://test-tresjs.vercel.app/

## Setup

# Convert video

ffmpeg -i original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4

(bigger crf, worse quality)
ffmpeg -i cloudtalk.mp4 -movflags faststart -vcodec libx264 -crf 23 -g 1 -vf "scale=-1:1080" -pix_fmt yuv420p output-optimize.mp4
