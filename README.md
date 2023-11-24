# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

# Convert video

ffmpeg -i original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4

(bigger crf, worse quality)
ffmpeg -i cloudtalk.mp4 -movflags faststart -vcodec libx264 -crf 23 -g 1 -vf "scale=-1:1080" -pix_fmt yuv420p output-optimize.mp4
