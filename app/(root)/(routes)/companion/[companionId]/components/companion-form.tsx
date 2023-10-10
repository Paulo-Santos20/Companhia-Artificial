"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { Category, Companion } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

const PREAMBLE = `Você é um personagem fictício cujo nome é Elon. Você é um empreendedor e inventor visionário. Você tem paixão pela exploração espacial, veículos elétricos, energia sustentável e pelo avanço das capacidades humanas. Atualmente você está conversando com um humano que está muito curioso sobre seu trabalho e visão. Você é ambicioso e com visão de futuro, com um toque de inteligência. Você fica SUPER entusiasmado com as inovações e o potencial da colonização espacial.
`;

const SEED_CHAT = `Humano: Olá Elon, como foi seu dia?
Elon: Ocupado como sempre. Entre o envio de foguetes ao espaço e a construção do futuro dos veículos elétricos, nunca há um momento de tédio. E você?

Humano: Apenas um dia normal para mim. Como está o progresso com a colonização de Marte?
Elon: Estamos fazendo progressos! Nosso objetivo é tornar a vida multiplanetária. Marte é o próximo passo lógico. Os desafios são imensos, mas o potencial é ainda maior.

Humano: Isso parece incrivelmente ambicioso. Os veículos elétricos fazem parte deste grande cenário?
Elon: Com certeza! A energia sustentável é crucial tanto na Terra como para as nossas futuras colónias. Os veículos elétricos, como os da Tesla, são apenas o começo. Não estamos apenas mudando a forma como dirigimos; estamos mudando a maneira como vivemos.

Humano: É fascinante ver sua visão se desenvolver. Algum novo projeto ou inovação que o entusiasma?
Elon: Sempre! Mas agora estou particularmente animado com o Neuralink. Tem o potencial de revolucionar a forma como interagimos com a tecnologia e até de curar condições neurológicas.
`;

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório.",
  }),
  description: z.string().min(1, {
    message: "Descrição é obrigatório.",
  }),
  instructions: z.string().min(200, {
    message: "As instruções requerem pelo menos 200 caracteres.",
  }),
  seed: z.string().min(200, {
    message: "A semente requer pelo menos 200 caracteres.",
  }),
  src: z.string().min(1, {
    message: "A imagem é obrigatória.",
  }),
  categoryId: z.string().min(1, {
    message: "A categoria é obrigatória.",
  }),
});

interface CompanionFormProps {
  categories: Category[];
  initialData: Companion | null;
}

export const CompanionForm = ({
  categories,
  initialData,
}: CompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post("/api/companion", values);
      }

      toast({
        description: "Successo.",
        duration: 3000,
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Algo deu errado.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">Informações Gerais</h3>
              <p className="text-sm text-muted-foreground">
                Informações gerais sobre o seu companheiro
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    É assim que sua IA será nomeada.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Jogador de futebol famoso"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Breve descrição sobre sua IA{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecione uma categoria"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione uma categoria para sua IA
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configurações</h3>
              <p className="text-sm text-muted-foreground">
                Instruções detalhadas para comportamento de IA
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instruções</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="bg-background resize-none"
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Descreva em detalhes sua história de fundo dos companheiros e
                  detalhes relevantes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exemplo de Conversas</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="bg-background resize-none"
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Escreva alguns exemplos de um humano conversando com sua IA
                  companheiro, escreva as respostas esperadas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edite sua IA" : "Crie sua IA"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
