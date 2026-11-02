export function setupDialog(buttonId: string, blockId: string) {
  const button = document.querySelector<HTMLDialogElement>(buttonId)!;
  const dialog = document.querySelector<HTMLFormElement>(blockId)!;

  button.onclick = () => dialog.showModal();
}
