Vagrant.configure("2") do |config|
  config.vm.box = "debian/stretch64"

  config.vagrant.plugins = [
    "vagrant-docker-compose",
    "vagrant-gatling-rsync",
    "vagrant-vbguest"
  ]

  config.vm.provider "virtualbox" do |v|
    v.memory = 4024
    v.cpus = 2
  end

  config.vm.synced_folder "./ideas", "/vagrant/ideas", type: "nfs", create: true

  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5433, host: 5432

  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: ["/vagrant/ideas/docker-compose.yml"], rebuild: true, run: "always"
end