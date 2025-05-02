export const getDisplayName = (folder, name) => {
  if (name) return name;
  
  return folder
    .split('_')
    .map((word, index) => 
      index === 0 
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}; 