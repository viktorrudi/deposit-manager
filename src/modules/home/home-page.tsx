import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Package, Plus, ShoppingBasket, X } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/card";
import { Button } from "../../components/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "../../components/modal";
import { RecentProducts } from "./components/recent-products-table";
import { NewProductForm } from "./components/new-product-form";
import { ActiveProductsCard, PendingProductsCard, CompaniesCard, UsersCard } from "./components/metric-cards";

export function HomePage() {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

  useEffect(() => {
    document.title = "DepositManager";
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ActiveProductsCard />
        <PendingProductsCard />
        <CompaniesCard />
        <UsersCard />
      </section>

      <section>
        <Card className="shadow-xs">
          <CardHeader className="border-b border-border pb-5">
            <CardTitle className="text-xl font-semibold">Quick actions</CardTitle>
            <CardDescription>Speed up your daily workflows.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 px-6 py-5">
            <Button asChild variant="outline">
              <Link to="/products" className="gap-2">
                <ShoppingBasket className="size-4" />
                View all products
              </Link>
            </Button>
            <Modal open={isCreateProductModalOpen} onOpenChange={setIsCreateProductModalOpen}>
              <ModalTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  Add new product
                </Button>
              </ModalTrigger>

              <ModalContent>
                <ModalClose aria-label="Close modal" type="button">
                  <X className="size-4" />
                </ModalClose>

                <ModalHeader>
                  <ModalTitle>Add new product</ModalTitle>
                  <ModalDescription>
                    Provide the required details to register a new product. All fields are mandatory.
                  </ModalDescription>
                </ModalHeader>

                <NewProductForm onSuccess={() => setIsCreateProductModalOpen(false)} />
              </ModalContent>
            </Modal>
          </CardContent>
        </Card>
      </section>

      <section>
        <RecentProducts />
      </section>
    </div>
  );
}
