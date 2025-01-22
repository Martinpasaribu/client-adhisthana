export const footerLinks = [
    {
      title: "About",
      links: [
        { title: "How it works", url: "/" },
        { title: "Our Vila", url: "/our-vila" },
        { title: "Partnership", url: "/" },
        { title: "Bussiness Relation", url: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "Events", url: "/" },
        { title: "Blog", url: "/" },
        { title: "Podcast", url: "/" },
        { title: "Invite a friend", url: "/" },
      ],
    },
    {
      title: "Socials",
      links: [
        { title: "Discord", url: "/" },
        { title: "Instagram", url: "/" },
        { title: "Twitter", url: "/" },
        { title: "Facebook", url: "/" },
      ],
    },
  ];


  export const convertToRupiah = (number:any) => {
    return number.toLocaleString('id-ID', {

      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };


  export const checkField = (fields: Record<string, any>): string | null => {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        return `${key} field cannot be empty.`;
      }
    }
    return null;
  };
  