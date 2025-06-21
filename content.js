(function() {
  'use strict';

  function insertNewline(activeElement) {
    if (activeElement.tagName === 'TEXTAREA') {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;
      activeElement.value = value.substring(0, start) + '\n' + value.substring(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + 1;
      
      const inputEvent = new Event('input', { bubbles: true });
      activeElement.dispatchEvent(inputEvent);
    } else {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
      
      const inputEvent = new Event('input', { bubbles: true });
      activeElement.dispatchEvent(inputEvent);
    }
  }

  function handleEnterKey(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
      const activeElement = document.activeElement;
      
      if (activeElement && (activeElement.tagName === 'TEXTAREA' || 
          (activeElement.getAttribute('contenteditable') === 'true'))) {
        
        // IME入力中は処理しない
        if (event.isComposing) {
          return;
        }
        
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // keyCode 229の場合でも改行を実行
        insertNewline(activeElement);
        
        return false;
      }
    }
  }

  function interceptEnterKey() {
    document.addEventListener('keydown', handleEnterKey, true);
    document.addEventListener('keypress', function(event) {
      if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'TEXTAREA' || 
            (activeElement.getAttribute('contenteditable') === 'true'))) {
          // IME入力中は処理しない
          if (event.isComposing) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return false;
        }
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptEnterKey);
  } else {
    interceptEnterKey();
  }

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        interceptEnterKey();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();