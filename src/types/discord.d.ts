export interface DiscordEmbed {
  title: string;
  url: string;
  image: {
    url: string
  };
  color?: number;
  footer?: {
    text: string;
  };
}