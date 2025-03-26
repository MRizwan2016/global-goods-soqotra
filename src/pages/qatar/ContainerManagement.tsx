
  // Add event listener for manifest view
  useEffect(() => {
    const handleViewManifest = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        setViewManifestId(event.detail.containerId);
        setActiveTab("view-manifest");
      }
    };
    
    document.addEventListener('viewManifest', handleViewManifest as EventListener);
    
    return () => {
      document.removeEventListener('viewManifest', handleViewManifest as EventListener);
    };
  }, []);
