export type AmbassadorSocial = {
  label: string;
  url: string;
};

export type Ambassador = {
  slug: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  photo?: string;
  socials: AmbassadorSocial[];
  en?: {
    role?: string;
    location?: string;
    bio?: string;
  };
};
